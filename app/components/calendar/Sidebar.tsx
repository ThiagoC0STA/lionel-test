import { User, UserDragItem } from '@/app/lib/types';
import { useDrag } from 'react-dnd';
import Image from 'next/image';

interface SidebarProps {
  users: User[];
}

export function Sidebar({ users }: SidebarProps) {
  return (
    <div className="w-48 border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Team Members</h2>
      </div>
      <div className="py-2">
        {users.map((user) => (
          <DraggableUser key={user.id} user={user} />
        ))}
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

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={`flex items-center gap-2 p-2 hover:bg-gray-50 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="relative w-8 h-8">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="rounded-full object-cover"
          sizes="32px"
        />
      </div>
      <div>
        <div className="text-sm font-medium">{user.name}</div>
        <div className="text-xs text-gray-500">{user.role}</div>
      </div>
    </div>
  );
}
