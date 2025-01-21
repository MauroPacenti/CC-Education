import "./Details.css";
import { PropsWithChildren } from "react";

const DetailItem = ({
  label,
  value,
  isEditable,
  onChange,
  inputName,
  inputKey,
}: {
  label: string;
  value?: string | number;
  isEditable?: boolean;
  inputName?: string;
  inputKey?: "keeper" | "group" | "organization" | "journey";
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "keeper" | "group" | "organization" | "journey"
  ) => void;
}) => {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}:</span>
      {isEditable ? (
        <input
          type="text"
          className="detail-value editable"
          value={value}
          onChange={(e) => onChange && onChange(e, inputKey!)}
          name={inputName}
        />
      ) : (
        <span className="detail-value">{value}</span>
      )}
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
