/**
 * v4 - Cover bottom selection (no cropping)
 * Enables cover selection with bottom alignment, same preview flow as v2
 * but without cropping/adjustment capabilities - only bottom sheet selection
 */
export const v4Config = {
  enableCoverSelection: true,
  showCoverSelectionUI: true,
  coverSelectionMode: "bottom",
  enablePreviewFlow: true, // Enable preview flow for cover selection (same as v2)
  enableCropping: false, // No cropping allowed
  showCroppingTools: false, // No cropping tools shown
}
