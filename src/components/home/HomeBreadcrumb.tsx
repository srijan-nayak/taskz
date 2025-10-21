import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function HomeBreadcrumb() {
  return (
    <Breadcrumb className="border-l-2 ps-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Taskz</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
