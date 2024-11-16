import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Lamide</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-lg mb-4">
            Lamide is a modern blog platform dedicated to sharing insightful
            stories and ideas across various topics. Our mission is to inspire,
            inform, and connect people through high-quality content.
          </p>
          <p className="text-lg mb-4">
            Founded in 2024, we&apos;ve quickly grown to become a trusted source
            for readers seeking diverse perspectives on technology, lifestyle,
            food, fashion, and business.
          </p>
          <p className="text-lg">
            Our team of passionate writers and editors work tirelessly to bring
            you the most engaging and informative articles. We believe in the
            power of words to change lives and shape the world around us.
          </p>
        </div>
        <div className="relative h-[600px] 2xl:h-[800px]">
          <Image
            src="/lamide.jpg"
            alt="lamide Team"
            layout="fill"
            objectFit="cover"
            className="rounded-lg bg-top object-contain"
          />
        </div>
      </div>
    </div>
  );
}
