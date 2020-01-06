export const fixOverflow = (text, limit) => {
    {
        if (text.includes("\n")) {
            return "..." + text.replace(/\n/g, "").substring(text.length - 3, text.length)
        }
        return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
    }
};