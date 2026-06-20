import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    await authService.logout();
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao fazer logout';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
