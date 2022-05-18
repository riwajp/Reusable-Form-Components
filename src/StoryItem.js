import FaIcon from "./icons.js";

const StoryItem = ({data}) => {
  const date = new Date(data._source.published_at);

  const format_dateTime = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const date_day = date.getDate();
    const year = date.getFullYear();
    const format_time = (t) => {
      if (t.toString().length === 1) {
        return "0" + t.toString();
      } else {
        return t;
      }
    };
    return (
      <span>
        {month} {date_day}, {year} {format_time(date.getHours())}:
        {format_time(date.getMinutes())}
      </span>
    );
  };

  const formatLocation = () => {
    const location = data._source.locations
      ? data._source.locations.primary
      : null;
    if (!location) {
      return <span></span>;
    } else if (location.type === "Ward") {
      return (
        <span>
          {location.municipality.name_ne}-{location.name_ne},{" "}
          {location.district.name_ne}
        </span>
      );
    } else {
      return <span>{location.name_ne}</span>;
    }
  };
  //return for App
  return (
    <div className="text-black text-md shadow-lg mt-2 w-full p-4">
      <div className="flex">
        <div className=" text-left w-full ">
          <FaIcon icon="clock" className="text-xs" />
          <span className="pl-1 text-xs">{format_dateTime()}</span>
        </div>
        <a
          href={data._source.url}
          className="text-right w-full text-purple-800 text-sm font-medium"
          target="_blank"
        >
          {data._source.host}
        </a>
        <FaIcon
          icon="external-link-alt"
          className="text-sm ml-1 text-purple-800"
        />
      </div>

      <div className="mt-2 font-semibold">{data._source.title}</div>

      <div className="mt-2 text-sm font-thin">
        <FaIcon icon="map-marker" className="text-sm float-left" />
        <span className="ml-2">{formatLocation()}</span>
      </div>
      <div className="mt-2 font-light ">
        {data._source.text.length > 220
          ? data._source.text.substring(0, 220) + "...."
          : data._source.text}
      </div>
    </div>
  );
};

export default StoryItem;
