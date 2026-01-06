import Image from "next/image";

interface QuestionImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * 過去問解説ページで使用する画像コンポーネント
 * 図表、グラフ、構造図などを表示する際に使用
 */
export default function QuestionImage({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
}: QuestionImageProps) {
  return (
    <figure className="my-6">
      <div className="relative w-full max-w-2xl mx-auto bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}




