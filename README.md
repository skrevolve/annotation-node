# annotation-node


## installation
```shell
npm install annotation-node
```

## example
```typescript
import express from 'express';
import { Controller, Get, ControllerRegistry } from 'annotation-node';

@Controller('/api')
class HelloController {
    @Get('/hello')
    sayHello(req: express.Request, res: express.Response) {
        res.send('Hello, World!');
    }
}

const app = express();

ControllerRegistry.registerControllers(app, [HelloController]);

app.listen(3000, () => console.log('Server is running on port 3000'));
```

```typescript
import { Controller, Get, Post, Put, Delete } from 'annotation-node';
import { Request, Response } from 'express';

@Controller('/users')
class UserController {
  @Get('/')
  getUsers(req: Request, res: Response) {
    res.send('List of users');
  }

  @Post('/')
  createUser(req: Request, res: Response) {
    res.send('User created');
  }

  @Put('/:id')
  updateUser(req: Request, res: Response) {
    res.send(`User ${req.params.id} updated`);
  }

  @Delete('/:id')
  deleteUser(req: Request, res: Response) {
    res.send(`User ${req.params.id} deleted`);
  }
}

export default UserController;
```

```typescript
import { Controller, Get, Middleware } from 'annotation-node';
import { Request, Response, NextFunction } from 'express';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers['authorization']) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

@Controller('/auth')
class AuthController {
  @Get('/protected')
  @Middleware(authMiddleware)
  protectedRoute(req: Request, res: Response) {
    res.send('This is a protected route');
  }
}

export default AuthController;
```
