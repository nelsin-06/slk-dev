import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsersService } from '../../src/users/users.service';

// Mock del PrismaService
const mockPrisma = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    // Limpia los mocks antes de cada test
    vi.clearAllMocks();
    service = new UsersService(mockPrisma as any);
  });

  it('should create a user', async () => {
    const dto = { name: 'Test', email: 'test@mail.com' };
    mockPrisma.user.create.mockResolvedValue({ id: 1, ...dto });
    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should return all users', async () => {
    const users = [{ id: 1, name: 'A', email: 'a@mail.com' }];
    mockPrisma.user.findMany.mockResolvedValue(users);
    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const user = { id: 1, name: 'A', email: 'a@mail.com' };
    mockPrisma.user.findUnique.mockResolvedValue(user);
    const result = await service.findOne(1);
    expect(result).toEqual(user);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a user', async () => {
    const dto = { name: 'B' };
    const updated = { id: 1, name: 'B', email: 'a@mail.com' };
    mockPrisma.user.update.mockResolvedValue(updated);
    const result = await service.update(1, dto as any);
    expect(result).toEqual(updated);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
  });

  // ✅ CORRECCIÓN: El remove hace soft delete (update), no delete físico
  it('should soft delete a user (set active: false)', async () => {
    const softDeleted = {
      id: 1,
      name: 'B',
      email: 'a@mail.com',
      active: false,
    };
    mockPrisma.user.update.mockResolvedValue(softDeleted);

    const result = await service.remove(1);

    expect(result).toEqual(softDeleted);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { active: false },
    });
  });
});
