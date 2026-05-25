interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="glass-card card-highlight">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
