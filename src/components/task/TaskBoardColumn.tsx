import { TasksList } from "@/lib/definitions/task";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function TaskBoardColumn({
  title,
  tasks,
}: {
  title: string;
  tasks: TasksList;
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 bg-background grow-1 rounded-md shadow-md">
      <p className="font-semibold text-xl">{title}</p>
      {tasks.map((t) => (
        <Item key={t.id} variant="outline" className="w-full shadow">
          <ItemContent>
            <ItemTitle>{t.title}</ItemTitle>
            {t.description && (
              <ItemDescription>{t.description}</ItemDescription>
            )}
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
