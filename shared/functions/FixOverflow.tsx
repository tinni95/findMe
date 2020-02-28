const FixOverflow = (text, limit) => {
  {
    return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
  }
};

export default FixOverflow;
