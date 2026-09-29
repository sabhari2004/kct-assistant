import FAQTable from '../../components/admin/FAQTable';

export default function FAQsPage() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <FAQTable />
      </div>
    </div>
  );
}
