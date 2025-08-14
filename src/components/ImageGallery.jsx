const images = [
  "boy.png",
  "boy (1).png",
  "boy (2).png",
  "girl.png",
  "girl (1).png",
  "girl (2).png"
];

export default function ImageGallery() {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {images.map((img) => (
        <img
          key={img}
          src={`/${img}`}
          alt={img}
          style={{ width: 120, height: "auto", borderRadius: 8 }}
        />
      ))}
    </div>
  );
}