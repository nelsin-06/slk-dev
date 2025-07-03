import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessagesService } from '../../src/messages/messages.service';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// Mock del DatabaseService (Prisma)
const mockPrisma = {
  message: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    delete: vi.fn(),
  },
};

// Mock del UsersService
const mockUsersService = {
  findOne: vi.fn(),
};

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    // Limpia los mocks antes de cada test
    vi.clearAllMocks();
    service = new MessagesService(mockPrisma as any, mockUsersService as any);
  });

  describe('create', () => {
    it('should create a message successfully', async () => {
      const dto = { content: 'Test message', userId: 1 };
      const createdMessage = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.message.create.mockResolvedValue(createdMessage);

      const result = await service.create(dto as any);

      expect(result).toEqual(createdMessage);
      expect(mockPrisma.message.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw ConflictException when user does not exist', async () => {
      const dto = { content: 'Test message', userId: 999 };

      mockPrisma.message.create.mockRejectedValue({ code: 'P2003' });

      await expect(service.create(dto as any)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(dto as any)).rejects.toThrow(
        'user does not exist',
      );
    });

    it('should throw InternalServerErrorException for unknown errors', async () => {
      const dto = { content: 'Test message', userId: 1 };

      mockPrisma.message.create.mockRejectedValue({ code: 'P9999' });

      await expect(service.create(dto as any)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.create(dto as any)).rejects.toThrow(
        'Internal server error',
      );
    });
  });

  describe('findAll', () => {
    it('should return all messages', async () => {
      const messages = [
        { id: 1, content: 'Message 1', userId: 1 },
        { id: 2, content: 'Message 2', userId: 2 },
      ];

      mockPrisma.message.findMany.mockResolvedValue(messages);

      const result = await service.findAll();

      expect(result).toEqual(messages);
      expect(mockPrisma.message.findMany).toHaveBeenCalled();
    });

    it('should return empty array when no messages exist', async () => {
      mockPrisma.message.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrisma.message.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a message by id', async () => {
      const message = { id: 1, content: 'Test message', userId: 1 };

      mockPrisma.message.findUnique.mockResolvedValue(message);

      const result = await service.findOne(1);

      expect(result).toEqual(message);
      expect(mockPrisma.message.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null when message does not exist', async () => {
      mockPrisma.message.findUnique.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(mockPrisma.message.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('remove', () => {
    it('should delete a message successfully', async () => {
      const deletedMessage = { id: 1, content: 'Test message', userId: 1 };

      mockPrisma.message.delete.mockResolvedValue(deletedMessage);

      const result = await service.remove(1);

      expect(result).toEqual(deletedMessage);
      expect(mockPrisma.message.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('getUserMessages', () => {
    it('should return messages for an existing user', async () => {
      const userId = 1;
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        active: true,
      };
      const messages = [
        { id: 1, content: 'Message 1', userId: 1 },
        { id: 2, content: 'Message 2', userId: 1 },
      ];

      mockUsersService.findOne.mockResolvedValue(user);
      mockPrisma.message.findMany.mockResolvedValue(messages);

      const result = await service.getUserMessages(userId);

      expect(result).toEqual(messages);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(userId);
      expect(mockPrisma.message.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    it('should throw ConflictException when user does not exist', async () => {
      const userId = 999;

      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.getUserMessages(userId)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.getUserMessages(userId)).rejects.toThrow(
        'User does not exist',
      );
    });

    it('should handle errors properly', async () => {
      const userId = 1;

      mockUsersService.findOne.mockRejectedValue({
        response: { code: 'P2003' },
      });

      await expect(service.getUserMessages(userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw InternalServerErrorException for unknown errors', async () => {
      const userId = 1;

      mockUsersService.findOne.mockRejectedValue({
        response: { code: 'UNKNOWN' },
      });

      await expect(service.getUserMessages(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
