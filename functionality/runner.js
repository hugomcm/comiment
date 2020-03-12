module.exports = {
  setMinSpeed: state => minSpeedKmh => ({
    newState: { ...state, minSpeedKmh }
  }),
  setMaxSpeed: state => maxSpeedKmh => ({
    newState: { ...state, maxSpeedKmh }
  }),
  cross: state => distanceInKm => {
    const { minSpeedKmh, maxSpeedKmh } = state;

    if (!maxSpeedKmh && !maxSpeedKmh) {
      throw 'Max or Min speed in kms not yet defined, please do that before cross anything!';
    }
    const minTimeToCross = distanceInKm / maxSpeedKmh;
    const maxTimeToCross = distanceInKm / minSpeedKmh;
    const lastCross = {
      distanceInKm,
      timeRange: [minTimeToCross, maxTimeToCross]
    };
    return {
      newState: {
        ...state,
        lastCross
      }
    };
  }
};
