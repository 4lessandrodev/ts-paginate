import { Pager } from "../../lib";

describe('paginate.ts', () => {
	
	
	interface IFake {
		id: string;
	};
	
	const paginate = new Pager().paginate;

	const fakeData: IFake[] = [];

	for (let index = 1; index < 42; index++) {
		fakeData.push({ id: String(index) });
	}

	it('should paginate 7 items after position 15º', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 7,
				after: '15'
			}
		}).toRest<IFake>();

		expect(result.pageInfo).toEqual({
			hasNextPage: true,
			hasPreviousPage: true,
			totalCount: 40,
			cursor: '22'
		})
		expect(result.data).toHaveLength(7);
		expect(result.data[0].id).toBe('15');
		expect(result.data[6].id).toBe('21');
	});

	it('should paginate 7 items before position 30º', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 7,
				after: '30'
			}
		}).toRest<IFake>();

		expect(result.pageInfo).toEqual({
			hasNextPage: true,
			hasPreviousPage: true,
			totalCount: 40,
			cursor: '37',
		})
		expect(result.data).toHaveLength(7);
		expect(result.data[0].id).toBe('30');
		expect(result.data[6].id).toBe('36');
	});

	it('should throw if try get data after last cursor', () => {

		expect.assertions(1);

		try {
			
			paginate({
				data: fakeData,
				params: {
					size: 10,
					after: '41'
				}
			}).toRest<IFake>();

		} catch (error: any) {
			expect(error.message).toBe('there is not data after cursor: 41');
		}

	});

	it('should return a empty data if provide the first cursor', () => {
		
		expect.assertions(1);

		try {
			
			paginate({
				data: fakeData,
				params: {
					size: 10,
					before: '1'
				}
			}).toRest<IFake>();
		} catch (error: any) {
			expect(error.message).toBe('there is not data before cursor: 1');
		}
	});


	it('should paginate 3 items after position 1º', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 3,
				after: '1'
			}
		}).toRest<IFake>();

		expect(result.pageInfo).toEqual({
			hasNextPage: true,
			hasPreviousPage: false,
			totalCount: 40,
			cursor: '4',
		})
		expect(result.data).toHaveLength(3);
		expect(result.data[0].id).toBe('1');
		expect(result.data[2].id).toBe('3');
	});

	it('should paginate 3 items 1-3', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 3
			}
		}).toRest<IFake>();

		expect(result.pageInfo).toEqual({
			hasNextPage: true,
			hasPreviousPage: false,
			totalCount: 40,
			cursor: '4'
		})
		expect(result.data).toHaveLength(3);
		expect(result.data[0].id).toBe('1');
		expect(result.data[2].id).toBe('3');
	});

	it('should do not have next page', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 7,
				after: '35'
			}
		}).toRest<IFake>();

		expect(result.pageInfo).toEqual({
			hasNextPage: false,
			hasPreviousPage: true,
			totalCount: 40,
			cursor: '41'
		});
	});


	it('should paginate to before', () => {
		const result = paginate({
			data: fakeData,
			params: {
				size: 3,
				before: '35'
			}
		}).toRest<IFake>();

		expect(result.data).toEqual([{ id: '33' }, { id: '34' }, { id: '35' }]);

		expect(result.pageInfo).toEqual({
			hasNextPage: true,
			hasPreviousPage: true,
			totalCount: 40,
			cursor: '33'
		});
	});

	it('should throws if provide before and after', () => {
		expect.assertions(1);

		try {
			paginate({ data: fakeData, params: { after: 'valid', before: 'valid' } }).toRest<IFake>();
		} catch (error: any) {
			expect(error.message).toBe('paginate: use after or before as cursor param');
		}
	})

	it('should throws if provide negative value as size', () => {
		expect.assertions(1);

		try {
			paginate({ data: fakeData, params: { size: -2 } }).toRest<IFake>();
		} catch (error: any) {
			expect(error.message).toBe('paginate: size param must be a positive number');
		}
	});

	it('should get start array if provide an invalid id', () => {

		expect.assertions(1);
		try {
			
			paginate({ data: fakeData, params: { size: 3, after: 'invalid_id' } }).toRest<IFake>();

		} catch (error: any) {
			expect(error.message).toBe('provided cursor: invalid_id does not exits on data')
		}

	});

	it('should get start array if provide an invalid id', () => {

		expect.assertions(1);
		try {
			
			paginate({ data: fakeData, params: { size: 3, before: 'invalid_id' } }).toRest<IFake>();

		} catch (error: any) {
			expect(error.message).toBe('provided cursor: invalid_id does not exits on data')
		}

	});

	it('should throws if some attribute on data does not have id attribute', () => {
		expect.assertions(1);

		try {
			
			fakeData[5] = { name: 'some name' } as any;
			paginate({ data: fakeData, params: { size: 3 } }).toRest<IFake>();

		} catch (error: any) {
			expect(error.message).toBe('paginate: all records on data must have id attribute');
		}
	});
	
});