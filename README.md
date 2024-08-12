# annotation-node


## installation
```shell
npm install annotation-node
```

## basic example
```typescript
import express, { Request, Response, NextFunction } from 'express';
import { Controller, Get, ControllerRegistry } from 'your-package-name';

@Controller('/users')
class UserController {
    @Get('/')
    getUsers(req: Request, res: Response) {
        res.send('List of users');
    }
}

@Controller('/products')
class ProductController {
    @Get('/')
    getProducts(req: Request, res: Response) {
        res.send('List of products');
    }
}

const app = express();

ControllerRegistry.addControllers(app, [UserController, ProductController], '/api');

app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Registering Controllers as a Single Array
```typescript
ControllerRegistry.addControllers(app, [UserController, ProductController]);
```

## Registering grouped controllers
```typescript
ControllerRegistry.addControllers(app, {
    '/v1': [UserController],
    '/v2': [ProductController]
});
```

## Add prefix for entire API
```typescript
ControllerRegistry.addControllers(app, [UserController, ProductController], '/api');
```

## Example using multiple HTTP methods
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

## Example of using middleware
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
