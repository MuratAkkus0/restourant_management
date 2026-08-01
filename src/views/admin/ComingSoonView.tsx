import { FaTools } from 'react-icons/fa';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';

interface ComingSoonViewProps {
  title: string;
}

// Shared placeholder for admin routes that are planned but not implemented
// yet. Used instead of bare `<div>Some Feature</div>` route elements so it is
// obvious to anyone using the app that these sections are unbuilt, not
// broken.
const ComingSoonView: React.FC<ComingSoonViewProps> = ({ title }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <TitleCardWithIcon text={title} Icon={FaTools} iconSize={25} />
      <div
        role="status"
        className="flex-1 flex flex-col items-center justify-center gap-3 bg-white rounded-lg p-8 text-center"
      >
        <FaTools size={32} className="text-gray-400" aria-hidden="true" />
        <p className="text-lg font-semibold text-gray-700">Coming soon</p>
        <p className="text-sm text-gray-500 max-w-md">
          This section of the admin panel is planned but not implemented yet.
        </p>
      </div>
    </div>
  );
};

export default ComingSoonView;
