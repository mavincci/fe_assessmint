function Step({ icon, title, description }) {
    return (
      <div className="flex items-start space-x-4">
        <div className="mt-1">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    );
}
  export default Step