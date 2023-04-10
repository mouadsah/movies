/**
 * Truncates the given string to the specified maximum length and appends ellipsis if needed.
 * @param string - The input string.
 * @param maxLength - The maximum length of the truncated string. Defaults to 90.
 * @returns The truncated string or an empty string if the input is null or empty.
 */
export function maxLength(string: string | null | undefined, maxLength = 90): string {
  if (string == null || string === '') {
    return '';
  }
  
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string;
}

/**
 * Returns the URL of the movie image.
 * @param image - The image path of the movie.
 * @returns The URL of the movie image or the URL of the default image if the input is null.
 */
export function movieImage(image: string | null): string {
  if (image == null) {
    return require('@/assets/images/default.jpg');
  }
  
  return `https://image.tmdb.org/t/p/w500/${image}`;
}

/**
 * Checks if the given string is null, empty or whitespace.
 * @param string - The input string.
 * @returns true if the input string is null, empty or whitespace. Otherwise, false.
 */
export function isEmpty(string: null | string | undefined): boolean {
  return string == null || string == undefined || string.trim() === '';
}
