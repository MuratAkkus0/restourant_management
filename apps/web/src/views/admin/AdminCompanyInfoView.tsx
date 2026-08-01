import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { WEEKDAYS, type OpeningHourInput, type Weekday } from '@manegio/shared';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import SideBySideInputContainer from '@/components/templates/SideBySideInputContainer';
import Button from '@/components/atoms/Button';
import { MdInfo, MdSchedule } from 'react-icons/md';
import {
  useGetCompanyProfileQuery,
  useGetOpeningHoursQuery,
  useUpdateCompanyProfileMutation,
  useUpdateOpeningHoursMutation,
} from '@/store/api/companiesApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

const DAY_LABELS: Record<Weekday, string> = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

function AdminCompanyInfoView() {
  const { data: company, isLoading: isCompanyLoading } = useGetCompanyProfileQuery();
  const { data: openingHours } = useGetOpeningHoursQuery();
  const [updateCompany, { isLoading: isSavingProfile }] = useUpdateCompanyProfileMutation();
  const [updateHours, { isLoading: isSavingHours }] = useUpdateOpeningHoursMutation();

  const [profile, setProfile] = useState({
    name: '',
    description: '',
    phone: '',
    street: '',
    houseNo: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
  });

  const [hours, setHours] = useState<OpeningHourInput[]>(
    WEEKDAYS.map((dayOfWeek) => ({ dayOfWeek, isClosed: true, opensAt: '09:00', closesAt: '22:00' })),
  );

  useEffect(() => {
    if (!company) return;
    setProfile({
      name: company.name,
      description: company.description ?? '',
      phone: company.phone ?? '',
      street: company.street ?? '',
      houseNo: company.houseNo ?? '',
      postalCode: company.postalCode ?? '',
      city: company.city ?? '',
      state: company.state ?? '',
      country: company.country ?? '',
    });
  }, [company]);

  useEffect(() => {
    if (!openingHours) return;
    setHours(
      WEEKDAYS.map((dayOfWeek) => {
        const existing = openingHours.find((h) => h.dayOfWeek === dayOfWeek);
        return existing
          ? {
              dayOfWeek,
              isClosed: existing.isClosed,
              opensAt: existing.opensAt ?? '09:00',
              closesAt: existing.closesAt ?? '22:00',
            }
          : { dayOfWeek, isClosed: true, opensAt: '09:00', closesAt: '22:00' };
      }),
    );
  }, [openingHours]);

  const handleProfileChange = (field: keyof typeof profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCompany(profile).unwrap();
      toast.success('Company profile updated.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update the company profile.'));
    }
  };

  const handleDayChange = (dayOfWeek: Weekday, field: keyof OpeningHourInput, value: string | boolean) => {
    setHours((prev) => prev.map((h) => (h.dayOfWeek === dayOfWeek ? { ...h, [field]: value } : h)));
  };

  const handleSaveHours = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHours({ hours }).unwrap();
      toast.success('Opening hours updated.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update opening hours.'));
    }
  };

  if (isCompanyLoading) {
    return <p className="text-gray-400 p-4">Loading company profile...</p>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <TitleCardWithIcon text="Company Information" Icon={MdInfo} iconSize={25} textSize="base" />

      <form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
        <UnderlinedInput
          labelText="Company name"
          inputId="name"
          inputValue={profile.name}
          onInputChange={handleProfileChange('name')}
        />
        <UnderlinedInput
          labelText="Description"
          inputId="description"
          inputValue={profile.description}
          onInputChange={handleProfileChange('description')}
          isMultiline
        />
        <UnderlinedInput
          labelText="Phone"
          inputId="phone"
          inputValue={profile.phone}
          onInputChange={handleProfileChange('phone')}
        />
        <SideBySideInputContainer
          isByMdScreensInputsGrid
          left={
            <UnderlinedInput
              labelText="Street"
              inputId="street"
              inputValue={profile.street}
              onInputChange={handleProfileChange('street')}
            />
          }
          right={
            <UnderlinedInput
              labelText="House No."
              inputId="houseNo"
              inputValue={profile.houseNo}
              onInputChange={handleProfileChange('houseNo')}
            />
          }
        />
        <SideBySideInputContainer
          isByMdScreensInputsGrid
          left={
            <UnderlinedInput
              labelText="City"
              inputId="city"
              inputValue={profile.city}
              onInputChange={handleProfileChange('city')}
            />
          }
          right={
            <UnderlinedInput
              labelText="Postal Code"
              inputId="postalCode"
              inputValue={profile.postalCode}
              onInputChange={handleProfileChange('postalCode')}
            />
          }
        />
        <SideBySideInputContainer
          isByMdScreensInputsGrid
          left={
            <UnderlinedInput
              labelText="State"
              inputId="state"
              inputValue={profile.state}
              onInputChange={handleProfileChange('state')}
            />
          }
          right={
            <UnderlinedInput
              labelText="Country"
              inputId="country"
              inputValue={profile.country}
              onInputChange={handleProfileChange('country')}
            />
          }
        />
        <Button text="Save profile" type="submit" className="w-fit" isSubmitInProgress={isSavingProfile} />
      </form>

      <TitleCardWithIcon text="Opening Hours" Icon={MdSchedule} iconSize={25} textSize="base" />
      <form onSubmit={handleSaveHours} className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
        {hours.map((day) => (
          <div key={day.dayOfWeek} className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-2">
            <span className="w-28 font-medium">{DAY_LABELS[day.dayOfWeek]}</span>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={!day.isClosed}
                onChange={(e) => handleDayChange(day.dayOfWeek, 'isClosed', !e.target.checked)}
              />
              Open
            </label>
            {!day.isClosed && (
              <>
                <input
                  type="time"
                  value={day.opensAt ?? ''}
                  onChange={(e) => handleDayChange(day.dayOfWeek, 'opensAt', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
                <span>-</span>
                <input
                  type="time"
                  value={day.closesAt ?? ''}
                  onChange={(e) => handleDayChange(day.dayOfWeek, 'closesAt', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
              </>
            )}
          </div>
        ))}
        <Button text="Save opening hours" type="submit" className="w-fit" isSubmitInProgress={isSavingHours} />
      </form>
    </div>
  );
}

export default AdminCompanyInfoView;
