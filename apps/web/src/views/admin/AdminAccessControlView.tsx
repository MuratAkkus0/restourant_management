import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { MdContentCopy, MdPeople } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import Button from '@/components/atoms/Button';
import { RootState } from '@/store/store';
import {
  useCreateInviteMutation,
  useGetInvitesQuery,
  useGetMembersQuery,
  useRemoveMemberMutation,
  useRevokeInviteMutation,
  useUpdateMemberRoleMutation,
} from '@/store/api/companiesApi';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Role } from '@manegio/shared';

function AdminAccessControlView() {
  const currentUser = useSelector((store: RootState) => store.auth.user);
  const isOwner = currentUser?.role === 'OWNER';

  const { data: members = [] } = useGetMembersQuery();
  const { data: invites = [] } = useGetInvitesQuery();
  const [createInvite, { isLoading: isInviting }] = useCreateInviteMutation();
  const [revokeInvite] = useRevokeInviteMutation();
  const [updateMemberRole] = useUpdateMemberRoleMutation();
  const [removeMember] = useRemoveMemberMutation();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'STAFF'>('STAFF');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invite = await createInvite({ email: inviteEmail, role: inviteRole }).unwrap();
      await navigator.clipboard.writeText(invite.acceptUrl).catch(() => undefined);
      toast.success(`Invite created for ${invite.email} - link copied to clipboard.`);
      setInviteEmail('');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not create the invite.'));
    }
  };

  const handleRoleChange = async (membershipId: string, role: Role) => {
    if (role !== 'ADMIN' && role !== 'STAFF') return;
    try {
      await updateMemberRole({ membershipId, body: { role } }).unwrap();
      toast.success('Role updated.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update the role.'));
    }
  };

  const handleRemove = async (membershipId: string, name: string) => {
    if (!window.confirm(`Remove ${name} from your team?`)) return;
    try {
      await removeMember(membershipId).unwrap();
      toast.success('Member removed.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not remove this member.'));
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    try {
      await revokeInvite(inviteId).unwrap();
      toast.success('Invite revoked.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not revoke the invite.'));
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <TitleCardWithIcon text="Staff & Access Control" Icon={MdPeople} iconSize={25} textSize="base" />

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-medium mb-3">Team members</h3>
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2"
            >
              <div>
                <p className="font-medium">
                  {member.user.firstName} {member.user.lastName}
                </p>
                <p className="text-sm text-gray-500">{member.user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                {member.role === 'OWNER' ? (
                  <span className="text-sm font-medium text-orange-600">Owner</span>
                ) : isOwner ? (
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="STAFF">Staff</option>
                  </select>
                ) : (
                  <span className="text-sm">{member.role}</span>
                )}
                {member.role !== 'OWNER' && isOwner && (
                  <button
                    aria-label={`Remove ${member.user.firstName}`}
                    onClick={() => handleRemove(member.id, member.user.firstName)}
                  >
                    <MdDeleteForever className="size-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-medium mb-3">Pending invites</h3>
        {invites.length === 0 && <p className="text-sm text-gray-400">No pending invites.</p>}
        <div className="flex flex-col gap-2">
          {invites.map((invite) => (
            <div key={invite.id} className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-sm">
                {invite.email} - <span className="text-gray-500">{invite.role}</span>
              </span>
              <button
                className="text-sm underline text-red-600"
                onClick={() => handleRevokeInvite(invite.id)}
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-medium mb-3">Invite a team member</h3>
        <form onSubmit={handleInvite} className="flex flex-col gap-4 max-w-md">
          <UnderlinedInput
            labelText="Email"
            inputId="inviteEmail"
            inputType="email"
            inputValue={inviteEmail}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteEmail(e.target.value)}
            inputPlaceHolder="colleague@example.com"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as 'ADMIN' | 'STAFF')}
              className="border rounded px-2 py-2 text-sm w-fit"
            >
              <option value="STAFF">Staff</option>
              {isOwner && <option value="ADMIN">Admin</option>}
            </select>
          </div>
          <Button text="Send invite" type="submit" className="w-fit flex items-center gap-2" isSubmitInProgress={isInviting} />
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <MdContentCopy /> The invite link is copied to your clipboard so you can share it directly.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminAccessControlView;
