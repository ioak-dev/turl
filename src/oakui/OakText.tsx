import React from 'react';
import './styles/oak-text-neu.scss';

interface Props {
  label?: string;
  id: string;
  data: any;
  type?: string;
  handleChange: any;
  errorFields?: any;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  handleFocus?: Function;
  placeholder?: string;
  prefix?: string;
}
const OakText = (props: Props) => {
  const handleFocus = () => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  };
  return (
    <div className="oak-text-neu">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {!props.multiline && (
        <div className="oak-text--container">
          <div className="oak-text--container--prefix">{props.prefix}</div>
          <input
            disabled={props.disabled}
            autoComplete="off"
            className={
              (props.errorFields && props.errorFields[props.id]
                ? 'error'
                : '') + (props.disabled ? ' disabled' : '')
            }
            type={props.type ? props.type : 'text'}
            name={props.id}
            id={props.id}
            value={props.data[props.id]}
            onChange={props.handleChange}
            onFocus={handleFocus}
            placeholder={props.placeholder}
          />
        </div>
      )}
      {/* rows={props.rows ? props.rows : 4} */}
      {props.multiline && (
        <textarea
          disabled={props.disabled}
          className={
            (props.errorFields && props.errorFields[props.id] ? 'error' : '') +
            (props.disabled ? ' disabled' : '')
          }
          id={props.id}
          name={props.id}
          value={props.data[props.id]}
          onChange={props.handleChange}
        />
      )}
      {/* {props.multiline && <div contentEditable={props.disabled ? false : true} suppressContentEditableWarning={true}
                className={"textarea " + (props.errorFields && props.errorFields[props.id] ? "error" : "") + (props.disabled ? " disabled" : "")}
                onBlur={handleChange}>{props.data[props.id]}</div>} */}
    </div>
  );
};

export default OakText;
