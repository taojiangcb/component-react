import React, { ChangeEvent, FC, KeyboardEventHandler, ReactElement, useState } from 'react';
import Input, { InputProps } from '../Input/Input';
import Icon from '../Icon/icon';


interface DataSourceObject { value: string }
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompletePorps extends Omit<InputProps, 'onSelect'> {
  fetchSuggstions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect: (item: DataSourceType) => void;
  renderOptions: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompletePorps> = props => {
  const {
    fetchSuggstions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggstions(value);
      if (result instanceof Promise) {
        setLoading(true);
        result.then(data => {
          setLoading(false);
          setSuggestions(data);
        })
        .catch((reason)=> {
          setLoading(false);
          setSuggestions([]);
        })
      }
      else {
        setSuggestions(result);
      }
    }
    else {
      setSuggestions([]);
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item;
  }

  const generateDropDown = () => {
    return <ul>
      {
        loading && 
        <div>
          <Icon icon='spinner' spin/>
        </div>
      }
      {suggestions && suggestions.map((item, index) => {
        <li
          key={index}
          onClick={() => { handleSelect(item) }} >
          {renderTemplate(item)}
        </li>
      })}
    </ul>
  }

  return (
    <div className="viking-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
      >
      </Input>
      {suggestions.length > 0 && generateDropDown()}
    </div>);
}

const handleKeyDown = (e: KeyboardEvent) => {

}

const handleSelect = (item: string) => {
  console.log(item);
}

// custom option
// keyboard support
// debource
// click outside
// export const AutoComplete;
