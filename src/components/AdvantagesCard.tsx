function AdvantagesCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-3 text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
        {title}
      </h3>
      <p className="text-neutralDark">{desc}</p>
    </div>
  );
}

export default AdvantagesCard;
