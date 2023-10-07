// E - Empty
// W - White
// B - Black
// K - King

export const initialState: string[][] = [
    ['E', 'E', 'E', 'B', 'B', 'B', 'B', 'B', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'B', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['B', 'E', 'E', 'E', 'E', 'W', 'E', 'E', 'E', 'E', 'B'],
    ['B', 'E', 'E', 'E', 'W', 'W', 'W', 'E', 'E', 'E', 'B'],
    ['B', 'B', 'E', 'W', 'W', 'K', 'W', 'W', 'E', 'B', 'B'],
    ['B', 'E', 'E', 'E', 'W', 'W', 'W', 'E', 'E', 'E', 'B'],
    ['B', 'E', 'E', 'E', 'E', 'W', 'E', 'E', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'B', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'B', 'B', 'B', 'B', 'B', 'E', 'E', 'E']
];

// N - Normal
// R - Restricted

export const restrictedSquares: string[][] = [
    ['Y', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ['Y', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y']
]
