import { Pager } from '../../lib'
import makeFakeUsers, { IUser } from "../../examples/make-data"

describe('example', () => {

	const pager = new Pager();

	interface IResult {
		original: IUser[];
		payload: IUser[];
		pageInfo: any;
	}
	
	const data: IResult = {
		original: [],
		payload: [],
		pageInfo: {
			hasNextPage: false,
			hasPreviousPage: false,
			totalCount: 0,
			cursor: undefined
		}
	}

	beforeAll(() => {
		data.original = makeFakeUsers(40);
	});

	it('should return first item data if try to go back', () => {

			const cursor = data.original[0].id;

			const result = pager.paginate({
				data: data.original,
				params: {
					before: cursor
				}
			}).toRest();

		expect(result.data).toHaveLength(1);
		expect(result.data[0]).toEqual(data.original[0]);
		expect(result.pageInfo.hasPreviousPage).toBeFalsy();
		expect(result.pageInfo.hasNextPage).toBeTruthy();
		
	});

	it('should get first 10 items if provide a size greater available', () => {

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 20,
				before: data.original[9].id
			}
		}).toGql();

		const firstCursor = result.data[0].cursor;

		expect(result.data).toHaveLength(10);
		expect(result.pageInfo.hasPreviousPage).toBeFalsy();
		expect(result.pageInfo.hasNextPage).toBeTruthy();
		expect(firstCursor).toBe(data.original[0].id);

	});

	it('should get first 15 items', () => {

		
		const result = pager.paginate({
			data: data.original,
			params: { size: 15 }
		}).toRest();
		
		data.payload = result.data;
		data.pageInfo = result.pageInfo;

		expect(result.data).toHaveLength(15);
		expect(result.pageInfo.hasPreviousPage).toBeFalsy();
		expect(result.pageInfo.hasNextPage).toBeTruthy();

	});

	it('should get next 15 items', () => {

		const nextCursor = data.pageInfo.cursor;

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 15,
				after: nextCursor
			}
		}).toRest();
		
		data.payload = result.data;
		data.pageInfo = result.pageInfo;

		expect(result.data).toHaveLength(15);
		expect(result.pageInfo.hasPreviousPage).toBeTruthy();
		expect(result.pageInfo.hasNextPage).toBeTruthy();

	});

	it('should get last 11 items', () => {

		const nextCursor = data.pageInfo.cursor;

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 15,
				after: nextCursor
			}
		}).toRest();

		data.payload = result.data;
		data.pageInfo = result.pageInfo;

		expect(result.data).toHaveLength(11);
		expect(result.pageInfo.hasPreviousPage).toBeTruthy();
		expect(result.pageInfo.hasNextPage).toBeFalsy();

	});

	it('should get empty if it finished', () => {

		try {
			
			const nextCursor = data.pageInfo.cursor;
	
			pager.paginate({
				data: data.original,
				params: {
					size: 15,
					after: nextCursor
				}
			}).toRest();

		} catch (error: any) {
			expect(error.message).toBe('there is not data after cursor: 41')
		}


	});

	it('should get back previous 16 items', () => {

		const nextCursor = data.pageInfo.cursor;

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 15,
				before: nextCursor
			}
		}).toRest();

		data.payload = result.data;
		data.pageInfo = result.pageInfo;

		expect(result.data).toHaveLength(15);
		expect(result.pageInfo.hasPreviousPage).toBeTruthy();
		expect(result.pageInfo.hasNextPage).toBeFalsy();

	});

	it('should get back previous 16 items as graphQL data', () => {

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 10,
				after: data.original[0].id
			}
		}).toGql();

		expect(result.data[0].node).toEqual(data.original[0]);
		expect(result.data[0].cursor).toEqual(data.original[0].id);
		expect(result.data).toHaveLength(10);
		expect(result.pageInfo.hasPreviousPage).toBeFalsy();
		expect(result.pageInfo.hasNextPage).toBeTruthy();

	});

	it('should get last 10 items if provide a size greater available', () => {

		const result = pager.paginate({
			data: data.original,
			params: {
				size: 20,
				after: data.original[31].id
			}
		}).toGql();

		const lastCursor = result.data[result.data.length - 1].cursor;

		expect(result.data).toHaveLength(10);
		expect(result.pageInfo.hasPreviousPage).toBeTruthy();
		expect(result.pageInfo.hasNextPage).toBeFalsy();
		expect(lastCursor).toBe(data.original[data.original.length -1].id);

	});
	
});
