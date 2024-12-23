const FormatDate = ({ date }) => {
  try {
    // Parse the date string into a Date object
    const parsedDate = new Date(date);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // Return an error message if the date is invalid
    }

    // Define months array
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Get day, month, year, hours, and minutes from the parsed date object
    const day = parsedDate.getUTCDate();
    const monthIndex = parsedDate.getUTCMonth();
    const year = parsedDate.getUTCFullYear();
    let hours = parsedDate.getUTCHours();

    // Convert hours to AM/PM format
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12

    // Format minutes with leading zeros
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

    // Format the date string
    const formattedDate = `${day} ${months[monthIndex]} ${year}, ${hours}:${minutes} ${amPm}`;

    // Return the formatted date
    return formattedDate;
  } catch (error) {
    return "Invalid Date"; // Catch any unexpected errors
  }
};

export default FormatDate;
