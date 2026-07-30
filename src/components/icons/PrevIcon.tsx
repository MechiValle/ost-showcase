interface IconProps {
  className?: string;
}

export default function PrevIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
    </svg>
  );
}