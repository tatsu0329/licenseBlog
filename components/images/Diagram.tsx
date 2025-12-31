/**
 * 図表・ダイアグラムを表示するコンポーネント
 * エンジン構造図、フローチャートなどを表示する際に使用
 */

interface DiagramProps {
  title?: string;
  children: React.ReactNode;
  caption?: string;
}

export default function Diagram({ title, children, caption }: DiagramProps) {
  return (
    <figure className="my-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {title && (
          <h4 className="font-semibold text-gray-900 mb-4 text-center">
            {title}
          </h4>
        )}
        <div className="flex justify-center items-center">{children}</div>
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}


