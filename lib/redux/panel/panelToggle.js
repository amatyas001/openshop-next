export const PANEL_TOGGLE = 'PANEL_TOGGLE';

export const panelToggle = (panel, value) => ({
  type: PANEL_TOGGLE,
  panel: {
    panel,
    value,
  },
});
