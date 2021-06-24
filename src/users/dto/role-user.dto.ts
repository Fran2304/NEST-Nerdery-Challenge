import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RoleUserDto {
  @IsNotEmpty()
  @IsEnum(Role, { message: 'role must be a MANAGER or CLIENT value' })
  role: string;
}