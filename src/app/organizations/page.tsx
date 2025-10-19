import CreateOrg from "@/components/CreateOrg";

export default function OrganizationsPage() {
  return (
    <>
      <div className="flex align-middle justify-between">
        <h1>Your Organizations</h1>
        <CreateOrg />
      </div>
    </>
  );
}
