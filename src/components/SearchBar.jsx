import { Search, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const SearchBar = ({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = "Search...",
  className = "",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {onSubmit && (
          <Button type="submit" variant="secondary">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
