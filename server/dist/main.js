"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const body_parser_1 = require("body-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, body_parser_1.urlencoded)({
        extended: true,
    }));
    app.use((0, body_parser_1.json)());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map