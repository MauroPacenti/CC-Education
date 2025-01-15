import "./Details.css";
import { PropsWithChildren } from "react";

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value}</span>
    </div>
  );
};

const DetailsGrid = ({ children }: PropsWithChildren) => {
  return <div className="details-grid">{children}</div>;
};

const DetailsSection = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <section className="details-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </section>
  );
};

const Details = {
  DetailItem,
  DetailsGrid,
  DetailsSection,
};

export default Details;
