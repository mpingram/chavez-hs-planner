import * as React from "react";

export interface AdditionalRequirementFormProps {
  field: React.ReactNode
  helpText: string
}

export const AdditionalRequirementForm: React.SFC<AdditionalRequirementFormProps> = props => {
  return (
    <div className="additional-requirement-form">
      <div className="additional-requirement-form-header">
        <div className="additional-requirement-form-field">
          {props.field}
        </div>
        <div className="additional-requirement-form-help-text">
          {props.helpText}
        </div>
      </div>
      <div className="additional-requirement-form-content">
        {props.children}
      </div>
    </div>
  );
};
