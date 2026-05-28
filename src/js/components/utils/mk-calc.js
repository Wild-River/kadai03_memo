export const convert = (value, base) => parseFloat((value / 5 + base).toFixed(1));
export const convertHalf = (value, base) => parseFloat((value / 5 + base / 2).toFixed(1));

export const convertStatsHalf = (data) => ({
    on_road_speed: convertHalf(data.on_road_speed, 0.4),
    off_road_speed: convertHalf(data.off_road_speed, 0.4),
    water_speed: convertHalf(data.water_speed, 0.4),
    acceleration: convertHalf(data.acceleration, 0.6),
    mini_turbo: convertHalf(data.mini_turbo, 0.8),
    weight: convertHalf(data.weight, 0.6),
    coin_curve: convertHalf(data.coin_curve, 0.4),
    on_road_handling: convertHalf(data.on_road_handling, 0.2),
    off_road_handling: convertHalf(data.off_road_handling, 0.2),
    water_handling: convertHalf(data.water_handling, 0.2),
    invincibility: convertHalf(data.invincibility, 0),
});

export const calcCombined = (character, vehicle) => {
    if (!character || !vehicle) return null;
    return {
        character,
        vehicle,
        on_road_speed: convert(character.on_road_speed + vehicle.on_road_speed, 0.4),
        off_road_speed: convert(character.off_road_speed + vehicle.off_road_speed, 0.4),
        water_speed: convert(character.water_speed + vehicle.water_speed, 0.4),
    };
};