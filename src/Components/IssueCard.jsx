export default function IssueCard({ issue }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{issue.title}</h3>
      <p>{issue.description}</p>
      <p className="text-sm text-gray-500">Status: {issue.status}</p>
      <p className="text-sm text-gray-400">By: {issue.createdBy}</p>
    </div>
  );
}
