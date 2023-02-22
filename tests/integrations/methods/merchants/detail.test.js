process.env.NODE_ENV = 'test';

const test = require('ava');
const sinon = require('sinon');
const MerchantRepository = require('../../../../src/repositories/merchant.repositories');
const Logger = require('../../../../src/utils/logger.utils');
const MerchantDetailMethods = require('../../../../src/methods/merchants/detail.methods');
const Language = require('../../../../src/languages');

function CreateMockResponse() {
    return {
        code: null,
        status(code) {
            this.code = code;
            return ({
                code,
                json: (data) => data
            });
        },
        json(data) {
            return JSON.stringify(data);
        }
    }
}

function CreateMockRequest({
    params = {},
    body = {},
    query = {},
    headers = {},
}) {
    return {
        body: {},
        params,
        query: {},
        headers: {}
    }
}

let sandbox;

test.beforeEach((t) => {
    sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
    sandbox.restore();
});

const language = Language.getLanguage('en');

test.serial('Should return internal server error', async (t) => {
    const params = { slug: 'test-123' };
    const MerchantRepositoryFindOneSpy = sandbox.stub(MerchantRepository, 'findOneWithLandingPageMetadata').withArgs(params).throws(new Error('Connection refused'));
    const LoggerSpy = sandbox.stub(Logger, 'error').resolves();

    try {
        const res = CreateMockResponse();
        const req = CreateMockRequest({ params });

        const result = await MerchantDetailMethods.getDetailFromSlug(req, res);

        t.is(res.code, 500);
        t.true(MerchantRepositoryFindOneSpy.calledOnce);
        t.true(LoggerSpy.calledOnce);
        t.deepEqual(result.message, language.INTERNAL_SERVER_ERROR );
    } catch (err) {
        console.log(err);
        t.fail();
    }
});
