const FixOverflow = (text: String, limit: number) => {
  {
    return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
  }
};

export default FixOverflow;
