/**
 * Internal dependencies
 */
import {
	clickBlockAppender,
	getEditedPostContent,
	newPost,
} from '../support/utils';

describe( 'Font Size Picker', () => {
	beforeEach( async () => {
		await newPost();
	} );

	it( 'should apply a named font size using the font size buttons', async () => {
		// Create a paragraph block with some content.
		await clickBlockAppender();
		await page.keyboard.type( 'Paragraph to be made "large"' );

		await page.click( '.components-font-size-picker__selector' );
		const changeSizeButton = await page.waitForSelector( '.components-button.is-font-large' );
		await changeSizeButton.click();

		// Ensure content matches snapshot.
		const content = await getEditedPostContent();
		expect( content ).toMatchSnapshot();
	} );

	it( 'should apply a custom font size using the font size input', async () => {
		// Create a paragraph block with some content.
		await clickBlockAppender();
		await page.keyboard.type( 'Paragraph to be made "custom"' );

		await page.click( '.components-font-size-picker__selector' );
		const changeSizeButton = await page.waitForSelector( '.components-button.is-font-custom' );
		await changeSizeButton.click();

		await page.click( '.blocks-font-size .components-range-control__number' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.type( '23' );

		// Ensure content matches snapshot.
		const content = await getEditedPostContent();
		expect( content ).toMatchSnapshot();
	} );

	it( 'should reset a named font size using the reset button', async () => {
		// Create a paragraph block with some content.
		await clickBlockAppender();
		await page.keyboard.type( 'Paragraph with named font size reset using button' );

		await page.click( '.components-font-size-picker__selector' );
		const changeSizeButton = await page.waitForSelector( '.components-button.is-font-small' );
		await changeSizeButton.click();

		// Blur the range control
		await page.click( '.components-base-control__label' );

		const resetButton = ( await page.$x( '//*[contains(concat(" ", @class, " "), " components-font-size-picker__buttons ")]//*[text()=\'Reset\']' ) )[ 0 ];
		await resetButton.click();

		// Ensure content matches snapshot.
		const content = await getEditedPostContent();
		expect( content ).toMatchSnapshot();
	} );

	it( 'should reset a custom font size using the reset button', async () => {
		// Create a paragraph block with some content.
		await clickBlockAppender();
		await page.keyboard.type( 'Paragraph with custom font size reset using button' );

		await page.click( '.components-font-size-picker__selector' );
		const changeSizeButton = await page.waitForSelector( '.components-button.is-font-custom' );
		await changeSizeButton.click();

		await page.click( '.blocks-font-size .components-range-control__number' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.type( '23' );

		// Blur the range control
		await page.click( '.components-base-control__label' );

		const resetButton = ( await page.$x( '//*[contains(concat(" ", @class, " "), " components-font-size-picker__buttons ")]//*[text()=\'Reset\']' ) )[ 0 ];
		await resetButton.click();

		// Ensure content matches snapshot.
		const content = await getEditedPostContent();
		expect( content ).toMatchSnapshot();
	} );
} );
