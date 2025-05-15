export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatHeight(height: number): string {
  // Pokémon API height is in decimetres; convert to meters
  return `${(height / 10).toFixed(1)} m`;
}

export function formatWeight(weight: number): string {
  // Pokémon API weight is in hectograms; convert to kilograms
  return `${(weight / 10).toFixed(1)} kg`;
}
