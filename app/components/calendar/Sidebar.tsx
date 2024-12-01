import { User, UserDragItem } from '@/app/lib/types';
import { useDrag } from 'react-dnd';
import Image from 'next/image';

interface SidebarProps {
  users: User[];
}

export function Sidebar({ users }: SidebarProps) {
  return (
    <div className="w-60 h-full border-r bg-white">
      <div className="p-6 border-b ">
        <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
        <p className="text-sm text-gray-500 mt-1">
          {users.length} active {users.length === 1 ? 'member' : 'members'}
        </p>
      </div>
      
      <div className="p-2">
        <div className="space-y-3">
          {users.map((user) => (
            <DraggableUser key={user.id} user={user} />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Drag and drop to schedule
        </div>
      </div>
    </div>
  );
}

function DraggableUser({ user }: { user: User }) {
  const [{ isDragging }, drag] = useDrag<UserDragItem, void, { isDragging: boolean }>(() => ({
    type: 'USER',
    item: { type: 'USER', userId: user.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getRoleStyles = (role: string) => {
    const styles = {
      'Chef': {
        badge: 'bg-red-50 text-red-700 ring-red-600/20',
        dot: 'bg-red-500'
      },
      'Commis': {
        badge: 'bg-blue-50 text-blue-700 ring-blue-600/20',
        dot: 'bg-blue-500'
      },
      'Service': {
        badge: 'bg-green-50 text-green-700 ring-green-600/20',
        dot: 'bg-green-500'
      },
      'Manager': {
        badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        dot: 'bg-amber-500'
      },
      'Reception': {
        badge: 'bg-purple-50 text-purple-700 ring-purple-600/20',
        dot: 'bg-purple-500'
      },
    };
    return styles[role as keyof typeof styles] || {
      badge: 'bg-gray-50 text-gray-700 ring-gray-600/20',
      dot: 'bg-gray-500'
    };
  };

  const roleStyle = getRoleStyles(user.role);

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={`
        group flex items-center gap-3 p-3 
        rounded-xl border border-gray-100
        transition-all duration-200 ease-in-out
        hover:bg-gray-50/80 hover:border-gray-200
        hover:shadow-sm hover:scale-[1.01]
        active:scale-[0.99]
        cursor-move
        ${isDragging ? 'opacity-50 scale-95 ring-2 ring-blue-500/20' : ''}
      `}
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="rounded-full object-cover border-2 border-white shadow-sm"
          sizes="40px"
        />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${roleStyle.dot} rounded-full border-2 border-white`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {user.name}
        </div>
        <div className={`
          inline-flex items-center px-2.5 py-0.5 mt-1 
          rounded-full text-xs font-medium
          ring-1 ring-inset
          ${roleStyle.badge}
        `}>
          {user.role}
        </div>
      </div>
      
      <div className="w-5 h-5 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </div>
  );
}
