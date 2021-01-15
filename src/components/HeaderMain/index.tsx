import React, { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { FormHeader, Header } from './styles';

interface HeaderMainProps {
  title: string;
  name: string;
  placeholder?: string;
  handleSearchKeyUp: (e: React.FormEvent<HTMLInputElement>) => void;
}

const HeaderMain: React.FC<HeaderMainProps> = ({
  title,
  name,
  placeholder,
  handleSearchKeyUp,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Header>
      <h1>{title}</h1>
      <FormHeader isFocused={isFocused}>
        <FiSearch />
        <input
          name={name}
          placeholder={placeholder}
          onKeyUp={handleSearchKeyUp}
          autoComplete="off"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </FormHeader>
    </Header>
  );
};

export default HeaderMain;
