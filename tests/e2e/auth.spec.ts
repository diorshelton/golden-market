import {test,expect} from "@playwright/test";

test.describe('Authentication', () => {
	
	test('user can register and login', async ({ page}) => {
		const email = `test-${Date.now()}@email.com`;
		const password = 'SecurePass123!';
	}
}

