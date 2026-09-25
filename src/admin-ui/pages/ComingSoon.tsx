import { Wrench } from 'lucide-react';

interface ComingSoonProps {
  pageName: string;
}

export default function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
          <Wrench size={40} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {pageName} Page Coming Soon
        </h2>
        <p className="text-gray-600 mb-6">
          This page is currently under construction. Check back soon for updates!
        </p>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Navigate using the sidebar to explore other available features
            of the EdriSync Admin Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
