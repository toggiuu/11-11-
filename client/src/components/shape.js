export const shapes = [
    // 다양한 블록 모양을 정의
    [[1, 1], [1, 1]], // 작은 네모
    [[1, 1, 1], [0, 1, 0]], // T자 모양
    [[1], [1], [1], [1]], // 세로 막대
    // 더 많은 블록 모양 추가 가능
];

export const getRandomShapes = (count) => {
    const randomShapes = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * shapes.length);
        randomShapes.push(shapes[randomIndex]);
    }
    return randomShapes;
};
