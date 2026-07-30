interface IconProps {
  className?: string;
}

export default function NextIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
    </svg>
  );
}