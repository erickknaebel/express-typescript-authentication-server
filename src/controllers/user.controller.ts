/* eslint-disable  @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { User } from '../constants/user.messages';
import userService from '../services/user.service';

class UserController {
  public UserService = new userService();

  /**
   * Controller to log a user in
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.loginUser(req.body);
      if (data === null) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message: User.USER_INVALID
        });
      }
      res
        .header({ Authorization: data.token })
        .status(HttpStatus.CREATED)
        .json({
          code: HttpStatus.CREATED,
          data: data,
          message: User.USER_LOGGED_IN
        });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.registerUser(req.body);
      if (data === null) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message: User.USER_EXISTS
        });
      }
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: User.USER_CREATED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get all users available
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: User.USERS_FETCHED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: User.USER_FETCHED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.updateUser(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: User.USER_UPDATED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.deleteUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: User.USER_DELETED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get the roles associated
   * to the curren user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getUserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUserRoles(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: User.USER_ROLES
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
