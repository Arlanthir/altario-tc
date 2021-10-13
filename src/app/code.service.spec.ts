import { TestBed } from '@angular/core/testing';

import { CodeService } from './code.service';

describe('CodeService', () => {
    let service: CodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CodeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate a given character equally', () => {
        let cCount = 0;
        for (let i = 0; i < 100000; ++i) {
            let genC = service.generateRandomChar();
            if (genC === 'c') {
                cCount++;
            }
        }
        // 100000 / 26 = about 3846 times
        // Expect the count to be inside a margin of 10% of that value
        expect(cCount).toBeGreaterThanOrEqual(3461);
        expect(cCount).toBeLessThanOrEqual(4231);
    });

    it('should generate a biased character 20% of the time', () => {
        let cCount = 0;
        for (let i = 0; i < 100000; ++i) {
            let genC = service.generateRandomChar('c');
            if (genC === 'c') {
                cCount++;
            }
        }
        // 20% of 100000 = 20000 times
        // Expect the count to be inside a margin of 10% of that value
        expect(cCount).toBeGreaterThanOrEqual(18000);
        expect(cCount).toBeLessThanOrEqual(22000);
    });

    it('should truncate code counts correctly', () => {
        expect(service.truncateCharCount(7)).toBe(7);
        expect(service.truncateCharCount(10)).toBe(5); // 10 / 2
        expect(service.truncateCharCount(16)).toBe(8); // 16 / 2
        expect(service.truncateCharCount(19)).toBe(7); // 19 / 3
        expect(service.truncateCharCount(45)).toBe(9); // 45 / 5
        expect(service.truncateCharCount(46)).toBe(8); // 46 / 6
        expect(service.truncateCharCount(52)).toBe(9); // 52 / 6
        expect(service.truncateCharCount(56)).toBe(8); // 56 / 7
        expect(service.truncateCharCount(57)).toBe(9); // 57 / 7
        expect(service.truncateCharCount(58)).toBe(9); // 58 / 7
        expect(service.truncateCharCount(59)).toBe(9); // 59 / 7
    });

    it('should calculate the code from a grid and a time', () => {
        const mockGrid = [
            ['v', 'v', 'v', 'v', 'v', 'v', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'v', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
        ];
        let mockTime = new Date();
        mockTime.setSeconds(36);
        expect(service.calculateCode(mockGrid, mockTime)).toBe('79');
    });
});
